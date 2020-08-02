import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../classes/Task.class';
import { TasksAPIService } from 'src/app/services/tasks-api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() tarefa: Task;
  @Input() dicionarioStatus: any;
  @Output() excluirTarefa = new EventEmitter();
  editandoTarefa = false;
  editandoTarefaValue: string;
  
  constructor(private _tasksApi: TasksAPIService) { }

  ngOnInit(): void {
  }

  tarefaCheckClick(){
    if(this.tarefaChecked()){
      this._tasksApi.abrirTarefa(this.tarefa.listId, this.tarefa.id)
      .subscribe(res=>{
        this.atualizarTarefa();
      }, err=>{
        console.error(err);
      });
    } else {
      this._tasksApi.concluirTarefa(this.tarefa.listId, this.tarefa.id)
      .subscribe(res=>{
        this.atualizarTarefa();
      }, err=>{
        console.error(err);
      });
    }
  }

  obterStatus(){
    return this.dicionarioStatus[this.tarefa.statusId].name;
  }

  tarefaChecked(){
    let stat = this.obterStatus();
    if (stat == "Concluído") return true;
    else if (stat == "Aberto") return false;
    else return false;
    /*verificar 'Fazendo'*/
  }

  tarefaCheckedClass(){
    return {'checked': this.tarefaChecked()}
  }

  atualizarTarefa(){
    this._tasksApi.recuperarTarefa(this.tarefa.listId, this.tarefa.id)
    .subscribe(res => {
      this.tarefa = res;
    }, err => {
      console.error(err);
    })
  }

  excluir(){
    this._tasksApi.apagarTarefa(this.tarefa.listId ,this.tarefa.id).subscribe(res => {
      this.excluirTarefa.emit(this.tarefa.id);
    }, err => {
      console.error(err);
    });
  }

  editandoTarefaClick(){
    if(this.editandoTarefa == false) this.editandoTarefaValue = this.tarefa.name;
    this.editandoTarefa = !this.editandoTarefa;
  }

  editarTarefa(){
    this.editandoTarefa = false;
    let patches = [{op:"replace", path:"/name", value: this.editandoTarefaValue }];
    this._tasksApi.editarTarefa(this.tarefa.listId, this.tarefa.id, patches).subscribe(res => {
      this.tarefa.name = this.editandoTarefaValue;
    }, err => {
      console.error(err)
    });
  }

}
