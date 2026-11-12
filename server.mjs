import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), process.argv.includes("--dir") ? "dist" : ".");
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".mjs":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".json":"application/json"};
const server = http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  let file = path.resolve(root,"."+pathname);
  if(!file.startsWith(root)){res.writeHead(403);res.end("Forbidden");return}
  if(pathname==="/"||pathname.endsWith("/"))file=path.join(file,"index.html");
  fs.readFile(file,(error,data)=>{
    if(error){res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});res.end("Not found");return}
    res.writeHead(200,{"content-type":types[path.extname(file)]||"application/octet-stream","cache-control":"no-cache"});
    res.end(data);
  });
});
const port = Number(process.env.PORT||4173);
server.listen(port,"0.0.0.0",()=>console.log("Conceptor running at http://localhost:"+port));
