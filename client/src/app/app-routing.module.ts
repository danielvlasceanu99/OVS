import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './components/pages/buy/buy.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { FuelEngineAdminComponent } from './components/pages/admin/fuel-engine-admin/fuel-engine-admin.component';
import { EngineComponent } from './components/pages/admin/engine/engine.component';
import { AdminHomeComponent } from './components/pages/admin/admin-home/admin-home.component';
import { PostAdminComponent } from './components/pages/admin/post-admin/post-admin.component';
import { ImageAdminComponent } from './components/pages/admin/image-admin/image-admin.component';
import { TransmissionAdminComponent } from './components/pages/admin/transmission-admin/transmission-admin.component';
import { ElectricEngineAdminComponent } from './components/pages/admin/electric-engine-admin/electric-engine-admin.component';
import { UsersAdminComponent } from './components/pages/admin/users-admin/users-admin.component';
import { TransactionAdminComponent } from './components/pages/admin/transaction-admin/transaction-admin.component';
import { CarAdminComponent } from './components/pages/admin/car-admin/car-admin.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { AuthGuard } from './_helpers/auth.guard';
import { OrdersComponent } from './components/pages/Orders/orders/orders.component';
import { ClientGuard } from './_helpers/client.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: BuyComponent }, //todo get by id
  { path: 'auth', component: AuthComponent },
  { path: 'conf/:id', component: CreatePostComponent }, //todo get by id /{id}
  {
    path: 'orders',
    canActivate: [ClientGuard],
    component: OrdersComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminHomeComponent,
  },
  {
    path: 'admin/fuel-engine',
    canActivate: [AuthGuard],
    component: FuelEngineAdminComponent,
  },
  {
    path: 'admin/engine',
    canActivate: [AuthGuard],
    component: EngineComponent,
  },
  {
    path: 'admin/post',
    canActivate: [AuthGuard],
    component: PostAdminComponent,
  },
  {
    path: 'admin/image',
    canActivate: [AuthGuard],
    component: ImageAdminComponent,
  },
  {
    path: 'admin/transmission',
    canActivate: [AuthGuard],
    component: TransmissionAdminComponent,
  },
  {
    path: 'admin/electric',
    canActivate: [AuthGuard],
    component: ElectricEngineAdminComponent,
  },
  {
    path: 'admin/users',
    canActivate: [AuthGuard],
    component: UsersAdminComponent,
  },
  {
    path: 'admin/transaction',
    canActivate: [AuthGuard],
    component: TransactionAdminComponent,
  },
  {
    path: 'admin/car',
    canActivate: [AuthGuard],
    component: CarAdminComponent,
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
