import { Component, OnInit } from '@angular/core';
import { TasksAPIService } from '../../services/tasks-api.service';
import { List } from '../../classes/List.class';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  novaLista: string;

  constructor(private _tasksApi: TasksAPIService) { }

  listas:List[] = [];

  ngOnInit(): void {
    this.recuperarListas();
  }

  registrarLista() {
    this._tasksApi.registrarLista(this.novaLista).subscribe(res=>{
      this.recuperarListas();
    }, error => {
      console.error(error);
    });
  }

  recuperarListas() {
    this._tasksApi.recuperarListas().subscribe(res=>{
      this.listas = res.items;
    }, error => {
      console.error(error);
    });
  }

  apagarLista(listId){
    let index = this.listas.findIndex(li=> li.id == listId);
    this.listas.splice(index, 1);
  }

}