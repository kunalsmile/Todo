import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import {TodoProvider} from '../../providers/todo/todo';

import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;

  constructor(private toastController: ToastController, private todoService: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoService.getTodos();
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReorderd($event){
    reorderArray(this.todos, $event);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo1(todoIndex){
    // this.todoService.archiveTodo(todoIndex);
    this.todoService.archiveTodo(todoIndex);
  }

 openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add a Todo",
      message: "Enter your Todo",
      inputs:[{
        type: "text",
        name: "addTodoInput"
      }],
      buttons: [{
        text: "Cancel"
      },{
        text: "Add a Todo",
        handler: (inputdata) => {
          let todoText;
          todoText = inputdata.addTodoInput;
          // this.todos.push(todoText);
          this.todoService.addTodo(todoText);

          addTodoAlert.onDidDismiss(() => {
            let addTodoToast = this.toastController.create({
              message: "Todo Added",
              duration: 2000
            });
            addTodoToast.present();
          });
        }
      }]
    });
    addTodoAlert.present();
  }

  openEditTodoAlert(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit Todo",
      message: "Enter you Todo",
      inputs:[{
        type: "text",
        name: "editTodoInput"
      }],
      buttons:[{
        text: "Cancel",
      }, {
        text: "Edit Todo",
        handler: (inputdata) => {
          let todoText;
          todoText = inputdata.editTodoInput;
          this.todoService.editTodo(todoIndex, todoText)

        editTodoAlert.onDidDismiss(() => {
            let addTodoToast = this.toastController.create({
              message: "Todo updated",
              duration: 2000
            });
            addTodoToast.present();
          });
        }
      }]
    });
    editTodoAlert.present();
  }
}
