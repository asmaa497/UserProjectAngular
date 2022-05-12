import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/ViewModels/IProduct';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  currPrd:IProduct|undefined=undefined;
  @Input() public img:string="";
  constructor(private dialogRef: MatDialogRef<ImgComponent>) { }

  ngOnInit(): void {
  }
  public CreateImgPath() {
    return `http://localhost:4319/${this.img}`;
  }
  close()
  {
    this.dialogRef.close();
  }

}
