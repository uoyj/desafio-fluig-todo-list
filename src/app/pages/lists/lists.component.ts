import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TasksAPIService } from '../../services/tasks-api.service';
import { List } from '../../classes/List.class';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  novaListaForm: FormGroup;
  listas:List[] = [];

  constructor(private _formBuilder:FormBuilder, private _tasksApi: TasksAPIService) { }

  

  ngOnInit(): void {
    this.novaListaForm = this._formBuilder.group({
      nome: new FormControl(null, [
        Validators.required
      ])
    });

    this.recuperarListas();
  }

  registrarLista() {
    let value = this.novaListaForm.value;
    this._tasksApi.registrarLista(value.nome).subscribe(res=>{
      this.recuperarListas();
      this.novaListaForm.reset();
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