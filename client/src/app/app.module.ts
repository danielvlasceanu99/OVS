import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { HomeComponent } from "./components/pages/home/home.component";
import { MatInputModule } from "@angular/material/input";
import { PostComponent } from "./components/cards/post/post.component";
import { BuyComponent } from "./components/pages/buy/buy.component";
import { CreatePostComponent } from "./components/pages/create-post/create-post.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { BuyOnlineDialogComponent } from "./components/dialogs/buy-online-dialog/buy-online-dialog.component";
import { ReserveDialogComponent } from "./components/dialogs/reserve-dialog/reserve-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FuelEngineAdminComponent } from "./components/pages/admin/fuel-engine-admin/fuel-engine-admin.component";
import { FuelEngineDialogComponent } from "./components/dialogs/admin-dialogs/fuel-engine/fuel-engine-dialog.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EngineComponent } from "./components/pages/admin/engine/engine.component";
import { EngineDialogComponent } from "./components/dialogs/admin-dialogs/engine-dialog/engine-dialog.component";
import { AdminHomeComponent } from "./components/pages/admin/admin-home/admin-home.component";
import { PostAdminComponent } from "./components/pages/admin/post-admin/post-admin.component";
import { DescriptionPipe } from "./components/shared/pipes/description.pipe";
import { PostDialogComponent } from "./components/dialogs/admin-dialogs/post-dialog/post-dialog.component";
import { ImageAdminComponent } from "./components/pages/admin/image-admin/image-admin.component";
import { ImageDialogComponent } from "./components/dialogs/admin-dialogs/image-dialog/image-dialog.component";
import { ViewImageDialogComponent } from "./components/dialogs/admin-dialogs/view-image-dialog/view-image-dialog.component";
import { TransmissionAdminComponent } from "./components/pages/admin/transmission-admin/transmission-admin.component";
import { TransmissionDialogComponent } from "./components/dialogs/admin-dialogs/transmission-dialog/transmission-dialog.component";
import { ElectricEngineAdminComponent } from "./components/pages/admin/electric-engine-admin/electric-engine-admin.component";
import { ElectricEngineDialogComponent } from "./components/dialogs/admin-dialogs/electric-engine-dialog/electric-engine-dialog.component";
import { UsersAdminComponent } from "./components/pages/admin/users-admin/users-admin.component";
import { TransactionAdminComponent } from "./components/pages/admin/transaction-admin/transaction-admin.component";
import { CarAdminComponent } from "./components/pages/admin/car-admin/car-admin.component";
import { UserDialogComponent } from "./components/dialogs/admin-dialogs/user-dialog/user-dialog.component";
import { CarDialogComponent } from "./components/dialogs/admin-dialogs/car-dialog/car-dialog.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { AuthComponent } from "./components/pages/auth/auth.component";
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";
import { EngineToStringPipe } from "./components/shared/pipes/engine-to-string.pipe";
import { TransmissionToStringPipe } from "./components/shared/pipes/transmission-to-string.pipe";
import { FuelEngineToStringPipe } from "./components/shared/pipes/fuel-engine-to-string.pipe";
import { ElectricEngineToStringPipe } from "./components/shared/pipes/electric-engine-to-string.pipe";
import { OrdersComponent } from './components/pages/Orders/orders/orders.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AuthComponent,
        PostComponent,
        BuyComponent,
        CreatePostComponent,
        BuyOnlineDialogComponent,
        ReserveDialogComponent,
        FuelEngineAdminComponent,
        FuelEngineDialogComponent,
        EngineComponent,
        EngineDialogComponent,
        AdminHomeComponent,
        PostAdminComponent,
        DescriptionPipe,
        PostDialogComponent,
        ImageAdminComponent,
        ImageDialogComponent,
        ViewImageDialogComponent,
        TransmissionAdminComponent,
        TransmissionDialogComponent,
        ElectricEngineAdminComponent,
        ElectricEngineDialogComponent,
        UsersAdminComponent,
        TransactionAdminComponent,
        CarAdminComponent,
        UserDialogComponent,
        CarDialogComponent,
        NotFoundComponent,
        EngineToStringPipe,
        TransmissionToStringPipe,
        FuelEngineToStringPipe,
        ElectricEngineToStringPipe,
        OrdersComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatExpansionModule,
        MatMenuModule,
        MatPaginatorModule,
        MatGridListModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatProgressBarModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
