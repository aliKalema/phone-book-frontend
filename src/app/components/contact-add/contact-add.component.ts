import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileHandle} from "../../interfaces/file-handle";
import {DomSanitizer} from "@angular/platform-browser";
import {Contact} from "../../interfaces/contact";
import {ContactService} from "../../services/contact.service";
import {FloatLabelType} from "@angular/material/form-field";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {CountryService} from "../../services/country.service";
import {Country} from "../../interfaces/country";
import {Subscription} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-component-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit , OnDestroy{
  contact: Contact ={
    email: "",
    firstName: "",
    id: 0,
    imageUrl: "",
    lastName: "",
    otherNames: "",
    phone: "",
    countryId:0
  }
  image: FileHandle | undefined;
  code: string ="";
  countries!: Array<Country>;
  countrySubscription: Subscription | undefined;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private contactService: ContactService,
              private sanitizer: DomSanitizer,
              private countryService: CountryService,
              private _formBuilder: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.countrySubscription= this.countryService.getAllCountries().subscribe((countryList)=>{this.countries=countryList});
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  onFileSelected(event:any){
    if(event.target.files){
      const selectedFile = event.target.files[0];
      this.image = {
        file: selectedFile,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(selectedFile))
      };
    }
  }

  prepareFormData(): FormData{
    const formData = new FormData();
    formData.append("contract", new Blob([JSON.stringify(this.contact)], {type: 'application/json'}));
    if(this.image){
      formData.append('imageFile',this.image!.file, this.image!.file.name);
    }
    return  formData;
  }

  onCountrySelected(code: string):void{
    this.code = code;
  }

  clearForm(contactForm: NgForm):void{
    contactForm.reset();
  }

  onSaveForm(contactForm: NgForm) {
    this.contactService.addContact(this.prepareFormData()).subscribe((response:Contact)=>{
      this.snackBar.open("Contact Added Successfully", 'Ok', { duration: 3000 });
      contactForm.reset();
    })
  }

  ngOnDestroy() {
    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
  }
}
