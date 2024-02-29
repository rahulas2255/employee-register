import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers:any[],Searchkey:string): any[] {
    const result:any =[]
    if(!allUsers || Searchkey=='' ){
    return allUsers;
  }
  allUsers.forEach((item=>{
    if(item.name?.trim().toLowerCase().includes(Searchkey.trim().toLowerCase())){
      result.push(item)
    }
  }))
  return result;

  }

}
