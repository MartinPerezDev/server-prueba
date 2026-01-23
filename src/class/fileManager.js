import { constants, writeFile } from "node:fs";
import { readFile, access } from "node:fs/promises";
import moment from "moment/moment.js";

export class FileManager {
  constructor(path) {
    this.path = path;
  }

  async verifiedArchive() {
    try {
      await access(this.path, constants.R_OK);
    } catch {
      writeFile(this.path, JSON.stringify([], null, 2), (err) => {
        if(!err) return true
      });
    }
  }

  async lastId() {
    try {
      if (this.items.length === 0) {
        return 1;
      }
      let newId = this.items[this.items.length - 1];
      return newId.id + 1;
    } catch (err) {
      throw err.message
    }
  }

  async itemExist(id) {
    const exist = this.items.some((res) => res.id === parseInt(id));
    return exist;
  }

  async get() {
    try {
        if(await readFile(this.path, "utf-8")!==[]){
            return this.items = JSON.parse(await readFile(this.path, "utf-8"))
        }
    } catch (err) {
      throw err.message
    }
  }

  async addProduct(item) {
    try {
      await this.get()
      const newId = await this.lastId(this.items);
      item = { id: newId, ...item, timestamp: moment().format("DD/MM/YYYY HH:mm") };
      this.items = [...this.items, item];
      writeFile(this.path, JSON.stringify(this.items, null, 2), (err) => {
        return this.items
      });
    } catch (err) {
      throw new Error("Error to save")
    }
  }

  async addCart(){
    try {
      await this.get()
      const newId = await this.lastId(this.items);
      const item = { id: newId, timestamp: moment().format("DD/MM/YYYY HH:mm"), products:[] };
      this.items = [...this.items, item];
      writeFile(this.path, JSON.stringify(this.items, null, 2), async(err) => {
        await this.get()
      });
      return {id: newId}
    } catch (err) {
      throw new Error("Error to add Item")
    }
  }

  async addProductInCart(id, item){
    try {
      await this.get()
      this.items.map((res)=> {
        if(res.id === parseInt(id)){
          res.products.push(item)
        }
      })
      writeFile(this.path, JSON.stringify(this.items, null, 2), async(err) => {
        await this.get()
      });
      const items = this.items.find( res=> res.id === parseInt(id))
      return items.products
    } catch (err) {
      throw new Error("Error to add Item")
    }
  }

  async deleteProductInCart(id, id_prod){
    try {
      let items = []
      let i = 0;
      await this.get()
      this.items.map((res)=>{
        if(res.id === parseInt(id)){
          if(!this.items[i].products.some((res)=> res.id === parseInt(id_prod))){
            throw new Error("Error to delete Item") 
          }else{
            items = this.items[i].products.filter( res=> res.id !== parseInt(id_prod))
            this.items[i].products = items
          }
        }
        i = i + 1
      })
      writeFile(this.path, JSON.stringify(this.items, null, 2), async (err) => {
        await this.get()
      });
      return items
    } catch (err) {
      throw new Error("Error to delete Item")
    }
  }

  async set(item, id) {
    try {
      await this.get()
      await this.items.map((res) => {
        if (res.id == parseInt(id)) {
          (res.timestamp = moment().format("DD/MM/YYYY HH:mm")),
          (res.nombre = item.nombre || res.nombre),
          (res.descripcion = item.descripcion || res.descripcion),
          (res.categoria = item.categoria || res.categoria),
          (res.imagen = item.imagen || res.imagen),
          (res.precio = item.precio || res.precio),
          (res.stock = item.stock || res.stock)
        }
      })
      writeFile(this.path, JSON.stringify(this.items, null, 2), async (err) => {
        await this.get()
      });
      return this.items
    } catch (err) {
      throw new Error("Error to save")
    }
  }

  async getById(id) {
    try {
      await this.get()
      if (await this.itemExist(id)) {
        return this.items.find((res) => res.id === parseInt(id));
      } else {
        throw new Error("Not Found");
      }
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async deleteById(id) {
    try {
      let i = 0;
      await this.get()
      for (const item of this.items) {
        if (item.id === parseInt(id)) {
          this.items.splice(i, 1);
          writeFile( this.path, JSON.stringify(this.items, null, 2) , async (err) => {
            await this.get()
          });
          return this.items
        }
        i = i + 1;
      }
      throw new Error("Not Found");
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async deleteAll() {
    try {
      writeFile(this.path, JSON.stringify([], null, 2), (err) => {
        if(!err) return true
      });
    } catch (err) {
      throw err.message
    }
  }

}
