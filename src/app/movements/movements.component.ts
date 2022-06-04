import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Movement {
  constructor(
    public id: number,
    public num: number,
    public x: number,
    public y: number,
    public z: number
  ) {
  }
}

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  movements: Movement[];
  private deleteId: number;
  closeResult: string;
  editForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMovements();
    this.editForm = this.fb.group({
      id: [''],
      num: [''],
      x: [''],
      y: [''],
      z: ['']
    });
  }

  getMovements(){
    this.httpClient.get<any>('http://localhost:8080/movements').subscribe(
      response => {
        console.log(response);
        this.movements = response;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.form.value);
    const url = 'http://localhost:8080/movements/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
     this.modalService.dismissAll(); // dismiss the modal
  }

  openEdit(targetModal, movement: Movement) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: movement.id,
      num: movement.num,
      x: movement.x,
      y: movement.y,
      z: movement.z
    });
   }

  onSave() {
    const editURL = 'http://localhost:8080/movements/' + this.editForm.value.id + '/edit';
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, movement: Movement) {
    this.deleteId = movement.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/movements/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL).subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  filter(scope) {
    scope.movements;
  }

}
