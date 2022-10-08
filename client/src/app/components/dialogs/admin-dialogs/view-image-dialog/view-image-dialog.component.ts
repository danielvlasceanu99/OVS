import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-view-image-dialog",
    templateUrl: "./view-image-dialog.component.html",
    styleUrls: ["./view-image-dialog.component.scss"],
})
export class ViewImageDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) {}

    ngOnInit(): void {}
}
