import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root,"dist");
await fs.rm(out,{recursive:true,force:true});
await fs.mkdir(out,{recursive:true});
for(const entry of ["index.html","src","assets"]){
  await fs.cp(path.join(root,entry),path.join(out,entry),{recursive:true});
}
console.log("Built static site in dist/");
