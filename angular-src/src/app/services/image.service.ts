import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ImageService {

  fileToUpload:File; 
  flag:any=null;
  result;
  
  constructor(private http: Http) {}
    
    upload(event,link,type) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
       let file: File = fileList[0];
       let formData:FormData = new FormData();
       formData.append(type, file, file.name);
       let headers = new Headers();
       console.log(file+":"+this.fileToUpload+":"+formData);
       return this.http.post(link, formData,{headers:headers})
        .map(file => file.json());
    }
  }

}
