import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from "../../interfaces/contact";
import {FileHandle} from "../../interfaces/file-handle";
import {Country} from "../../interfaces/country";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {FloatLabelType} from "@angular/material/form-field";
import {ContactService} from "../../services/contact.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CountryService} from "../../services/country.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit, OnDestroy {
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
  routeSubscription: Subscription | undefined;
  contactId: number=0;
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
              private snackBar: MatSnackBar,
              private activatedRoute:ActivatedRoute,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.countrySubscription= this.countryService.getAllCountries().subscribe((countryList)=>{this.countries=countryList});
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.contactId = params['id'];
      this.contactService.getContactById(this.contactId).subscribe((resp)=>{
        this.contact = resp;
        if(this.contact!.image!){
          this.imageService.urlToFile(this.contact!.image).subscribe(file => {
            this.image = {
              file: file,
              url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file))
            };
          });
        }
      })
    });
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
    this.contactService.editContact(this.prepareFormData(),this.contactId).subscribe((response:Contact)=>{
      this.snackBar.open("Contact Edited Successfully", 'Ok', { duration: 3000 });
      contactForm.reset();
    })
  }

  ngOnDestroy() {
    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
  }
}
