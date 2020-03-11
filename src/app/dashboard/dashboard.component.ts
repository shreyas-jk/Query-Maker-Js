import { Component, OnInit, AbstractType, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ServicesService } from '../services.service';
import { stringify } from 'querystring';

export interface JoinFields {
  value: string;
  viewValue: string;
}

export interface TableColumns{
  COLUMN_NAME : string;
}

@Component({
  selector: 'app-querymaker',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class QueryMakerComponent implements OnInit {

  constructor(private _fb: FormBuilder, private services: ServicesService) { }
  private newAttribute: any = {};
  tableArray1:any=[];
  tableArray2:any=[];
  anArray3:any=[];
  output:string="";
  join1Fields: any[1] = [];
  join2Fields: any[1] = [];
  joinType = "JOIN";
  isState="";
  TableName1: any;
  TableName2: any;
  pullTableName: any;
  xloop: any[];
  in_sv= "MSI";
  in_db= "TestDB";
  in_usr: any;
  in_pwd: any;
  validate: any;
  mdbModal: any;
  activeJoin: any;
  isDisabled: boolean = false;

  copyToClipboard() {
    let copyString: string = "";
    for(let  x of this.xloop)
    {
      copyString = copyString + " " + x;
    }

    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = copyString;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

  }

  left()
  {
      this.joinType = "LEFT JOIN";
      this.isState = "state2";
  }

  right()
  {
      this.joinType = "RIGHT JOIN";
      this.isState = "state3";
  }

  inner()
  {
      this.joinType = "INNER JOIN";
      this.isState = "state1";
  }

  full()
  {
      this.joinType = "FULL JOIN"; 
      this.isState = "state4";
  }

  cross()
  {
      this.joinType = "CROSS JOIN";
      this.isState = "state5";
  }

  self()
  {
      this.joinType = "JOIN";
      this.isState = "state6";
      this.TableName2 = this.TableName1;
      this.tableArray2 = [];
      for(var k = 0; k < Object.keys(this.tableArray1).length; k++)
      {
        debugger
        this.tableArray2.push({ "TField1" : this.tableArray1[k].TField1, "TField3" : true});
      }
  }

  executeSql(sql: any)
  {
    this.services.ExecuteSql(sql,this.in_sv, this.in_db, this.in_usr, this.in_pwd).subscribe((res)=>{
      debugger
      this.validate = res;
    });
  }
  Add1()
  {
    debugger
      this.tableArray1.push({'value':''});
  }

  _Add1(key: string, obj: any)
  {
    this.tableArray1 = [];
    for(var k = 0; k < Object.keys(obj).length; k++)
    {
      this.tableArray1.push({ [key] : obj[k].COLUMN_NAME, "TField3" : true});
    }
  }

  Remove1()
  {
      this.tableArray1.pop({'value':''});
  }

  Add2()
  {
      this.tableArray2.push({'value':''});
  }

  _Add2(key: string, obj: any)
  {
    this.tableArray2 = [];
    for(var k = 0; k < Object.keys(obj).length; k++)
    {
      this.tableArray2.push({ [key] : obj[k].COLUMN_NAME, "TField3" : true });
    }
    
  }

  Remove2()
  {
      this.tableArray2.pop({'value':''});
  }

  
  AddJoin()
  {
      this.anArray3.push({'value':''});
  }
  RemoveJoin()
  {
      this.anArray3.pop({'value':''});
  }

  check(value : any)
  {
    alert(value);
  }

  addToSelect1(columnName : any, tCheckbox : any)
  {
    if(tCheckbox == true)
    {
      this.join1Fields.push({'value':columnName});
    }
    else
    {
      this.join1Fields.pop({'value':columnName});
    }
  }

  addToSelect2(columnName : any, tCheckbox : any)
  {
    if(tCheckbox == true)
    {
      this.join2Fields.push({'value':columnName});
    }
    else
    {
      this.join2Fields.pop({'value':columnName});
    }
  }

  SchemaFormations(sv: string, db: string, usr: string, pwd: string, tblnm: string, tabidx: string)
  {
    debugger
    this.services.SchemaFormations(sv, db, usr, pwd, tblnm).subscribe((res)=>{
      var fields = res;

      if(tabidx == "TableName1")
      {
        this._Add1("TField1", fields);
      }

      if(tabidx == "TableName2")
      {
        this._Add2("TField1", fields);
      }
      // for(var k = 0; k < Object.keys(fields).length; k++)
      // {        
      //   if(tabidx == "TableName1")
      //   {
      //     this._Add1("TField1", fields[k].COLUMN_NAME);
      //   }
      //   if(tabidx == "TableName2")
      //   {
      //     this._Add2("TField1", fields[k].COLUMN_NAME);
      //   }
        
      // }

   });
  }

  initFormation(tblnm: string, tabidx: string,e)
  {
    debugger
    this.SchemaFormations(this.in_sv, this.in_db, this.in_usr, this.in_pwd, tblnm, tabidx);
  }

  modal: any;
  openModal(modal: any)
  {
    this.modal = document.getElementById("myModal" + modal);
    this.modal.style.display = "block";
  }

  close(modal: any)
  {
    this.modal = document.getElementById("myModal" + modal);
    this.modal.style.display = "none";
  }

  onSubmitHeaderTable(form1, form2, joinConds, tabname1, tabname2) {
    debugger
    let table1: any, table2: any, joinTable: any;
    const that = this;  
    table1 = JSON.stringify(form1);  
    table2 = JSON.stringify(form2);  
    joinTable = JSON.stringify(joinConds);  

  this.services.PostTable(table1, table2, joinTable, tabname1, tabname2, this.joinType).subscribe((res)=>{
    this.output= res;
    
    this.xloop = this.output.split(" ");

 });

}
  ngOnInit() {






      
  }

  

}
