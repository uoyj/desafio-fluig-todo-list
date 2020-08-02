import { List } from '../classes/List.class'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksAPIService {
  readonly apiUrl = 'http://tasks-prod.k8s-platform-prod-us-east-1.fluig.io/tasks/api/v2';

  constructor( private _http: HttpClient) { }

  registrarLista(nome:string){
    return this._http.post<any>(`${this.apiUrl}/lists`, {name: nome});
  }

  recuperarListas(){
    return this._http.get<any>(`${this.apiUrl}/lists`);
  }

  recuperarLista(listId:string){
    return this._http.get<any>(`${this.apiUrl}/lists/${listId}`);
  }

  recuperarStatus(listId:string){
    return this._http.get<any>(`${this.apiUrl}/lists/${listId}/task-status`);
  }

  editarLista(listId:string, patches:any){
    return this._http.put<any>(`${this.apiUrl}/lists/${listId}`, patches);
  }

  apagarLista(listId:string){
    return this._http.delete<any>(`${this.apiUrl}/lists/${listId}`);
  }

  registrarTarefa(listId:string, nome:string){
    return this._http.post<any>(`${this.apiUrl}/lists/${listId}/tasks`, {name: nome});
  }

  recuperarTarefas(listId:string){
    return this._http.get<any>(`${this.apiUrl}/lists/${listId}/tasks`);
  }

  recuperarTarefa(listId:string, taskId:string){
    return this._http.get<any>(`${this.apiUrl}/lists/${listId}/tasks/${taskId}`);
  }

  editarTarefa(listId:string, taskId:string, patches:any){
    return this._http.put<any>(`${this.apiUrl}/lists/${listId}/tasks/${taskId}`, patches);
  }

  abrirTarefa(listId:string, taskId:string){
    return this._http.post<any>(`${this.apiUrl}/lists/${listId}/tasks/${taskId}/open`, null);
  }

  concluirTarefa(listId:string, taskId:string){
    return this._http.post<any>(`${this.apiUrl}/lists/${listId}/tasks/${taskId}/close`, null);
  }
}
