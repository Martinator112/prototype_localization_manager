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
var router_1 = require('@angular/router');
var project_fetcher_service_1 = require('../services/project-fetcher.service');
var ProjectListComponent = (function () {
    function ProjectListComponent(projectFetcher, router) {
        this.projectFetcher = projectFetcher;
        this.router = router;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        this.projects = [];
        this.getProjects();
    };
    ProjectListComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectFetcher.getProjects().then(function (projects) { return _this.projects = projects; });
    };
    ProjectListComponent.prototype.goToDetail = function (project) {
        var link = ['/project/detail', project.id];
        this.router.navigate(link);
    };
    ProjectListComponent = __decorate([
        core_1.Component({
            selector: 'project-list',
            templateUrl: 'app/view/project-list.component.html'
        }), 
        __metadata('design:paramtypes', [project_fetcher_service_1.ProjectFetcherService, router_1.Router])
    ], ProjectListComponent);
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;
//# sourceMappingURL=project-list.component.js.map