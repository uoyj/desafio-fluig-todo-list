import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../classes/List.class';
import { TasksAPIService } from '../../services/tasks-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() lista: List;
  tarefas = [];
  dicionarioStatus = {};
  novaTarefa: string;
  editandoNome = false;
  editandoNomeValue: string;
  
  constructor(private _tasksApi: TasksAPIService) { }

  ngOnInit(): void {    
    this.recuperarStatus().then(statuses => {
      this.recuperarTarefas();
      this.statusesParse(statuses.items);
    });
  }

  registrarTarefa(){
    this._tasksApi.registrarTarefa(this.lista.id, this.novaTarefa).subscribe(res => {
      this.recuperarTarefas();
    }, err => {
      console.log(err)
    });
  }

  recuperarTarefas(){
    this._tasksApi.recuperarTarefas(this.lista.id).subscribe(res => {
      this.tarefas = res.items;
    }, err => {
      console.log(err)
    });
  }

  recuperarStatus(){
    return this._tasksApi.recuperarStatus(this.lista.id).toPromise();
  }

  editandoNomeClick(){
    if(this.editandoNome == false) this.editandoNomeValue = this.lista.name;
    this.editandoNome = !this.editandoNome;
  }

  renomearLista(){
    this.editandoNome = false;
    this._tasksApi.editarLista(this.lista.id, {name: this.editandoNomeValue}).subscribe(res => {
      this.lista.name = this.editandoNomeValue;
    }, err => {
      console.log(err)
    });
  }

  statusesParse(statuses){
    statuses.forEach(s => {
      this.dicionarioStatus[s.id] = s;
    });
  }

}
