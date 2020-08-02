import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../../classes/List.class';
import { TasksAPIService } from '../../services/tasks-api.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() lista: List;
  @Output() apagarLista = new EventEmitter();
  renomearListaForm: FormGroup;
  adicionarTarefaForm: FormGroup;
  tarefas = [];
  dicionarioStatus = {};
  editandoNome = false;
  modoApagar = false;
  
  constructor(private _formBuilder:FormBuilder, private _tasksApi: TasksAPIService) { }

  ngOnInit(): void {
    
    this.renomearListaForm = this._formBuilder.group({
      nome: new FormControl(this.lista.name, [
        Validators.required
      ])
    });

    this.adicionarTarefaForm = this._formBuilder.group({
      nome: new FormControl(null, [
        Validators.required
      ])
    });

    this.recuperarStatus().then(statuses => {
      this.recuperarTarefas();
      this.statusesParse(statuses.items);
    });

  }

  registrarTarefa(){
    let value = this.adicionarTarefaForm.value;
    this._tasksApi.registrarTarefa(this.lista.id, value.nome).subscribe(res => {
      this.adicionarTarefaForm.reset();
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
    if(this.editandoNome == false) this.renomearListaForm.setValue({nome: this.lista.name });
    this.editandoNome = !this.editandoNome;
  }

  renomearLista(){
    let value = this.renomearListaForm.value;
    this.editandoNome = false;
    let patches = [{op:"replace", path:"/name", value: value.nome }];
    this._tasksApi.editarLista(this.lista.id, patches).subscribe(res => {
      this.lista.name = value.nome;
    }, err => {
      console.log(err)
    });
  }

  statusesParse(statuses){
    statuses.forEach(s => {
      this.dicionarioStatus[s.id] = s;
    });
  }

  apagar(){
    this.modoApagar = true;
  }

  cancelarApagar(){
    this.modoApagar = false;
  }

  confirmarApagar(){
    this._tasksApi.apagarLista(this.lista.id).subscribe(res => {
      this.apagarLista.emit(this.lista.id);
    }, err => {
      console.log(err);
    });
  }

  excluirTarefa(taskId){
    let index = this.tarefas.findIndex(li=> li.id == taskId);
    this.tarefas.splice(index, 1);
  }

}
