"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var HomeComponent = (function () {
    function HomeComponent(_formbuilder, route, router) {
        this._formbuilder = _formbuilder;
        this.route = route;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        //        this.
        this.myForm = this._formbuilder.group({
            "username": ["", forms_1.Validators.required],
            "serverName": ["", forms_1.Validators.required]
        });
    };
    HomeComponent.prototype.onSubmit = function () {
        this.username = this.myForm.value['username'];
        this.serverName = this.myForm.value['serverName'];
        console.log("username " + this.username);
        console.log("serverName " + this.serverName);
        this.router.navigate(['/chat', this.serverName]);
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map