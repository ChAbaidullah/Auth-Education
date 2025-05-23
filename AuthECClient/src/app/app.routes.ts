import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './shared/auth.guard';
import { AdminOnlyComponent } from './authorizeDemo/admin-only/admin-only.component';
import { AdminOrTeacherComponent } from './authorizeDemo/admin-or-teacher/admin-or-teacher.component';
import { ApplyForMaternityLeaveComponent } from './authorizeDemo/apply-for-maternity-leave/apply-for-maternity-leave.component';
import { LibraryMembersOnlyComponent } from './authorizeDemo/library-members-only/library-members-only.component';
import { Under10AndFemaleComponent } from './authorizeDemo/under10-and-female/under10-and-female.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { claimReq } from './shared/utils/claimReq-utils';
import { StudentDashboardComponent } from './authorizeDemo/student-dashboard/student-dashboard.component';
import { UserDashboardComponent } from './authorizeDemo/user-dashboard/user-dashboard.component';
import { ContactUsComponent } from './authorizeDemo/contact-us/contact-us.component';
import { ApplyForAdmissionComponent } from './authorizeDemo/apply-for-admission/apply-for-admission.component';
import { ApplyTeacherComponent } from './authorizeDemo/apply-teacher/apply-teacher.component';
import { ManageUsersComponent } from './authorizeDemo/manage-users/manage-users.component';
import { AdminReportsComponent } from './authorizeDemo/admin-reports/admin-reports.component';
import { AdminSettingsComponent } from './authorizeDemo/admin-settings/admin-settings.component';
import { CoursesComponent } from './authorizeDemo/courses/courses.component';
import { StudentRecordsComponent } from './authorizeDemo/student-records/student-records.component';
import { AssignmentsComponent } from './authorizeDemo/assignments/assignments.component';
import { SchedulesComponent } from './authorizeDemo/schedules/schedules.component';
import { StudentAssignmentsComponent } from './authorizeDemo/student-assignments/student-assignments.component';
import { TestSchedulesComponent } from './authorizeDemo/test-schedules/test-schedules.component';
import { TimetableComponent } from './authorizeDemo/timetable/timetable.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: '', component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent },
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'admin-only', component: AdminOnlyComponent,
        data: { claimReq: claimReq.adminOnly }
      },
      {
        path: 'manage-users', component: ManageUsersComponent,
        data: { claimReq: claimReq.adminOnly }
      },
      {
        path: 'admin-reports', component: AdminReportsComponent,
        data: { claimReq: claimReq.adminOnly }
      },
      {
        path: 'admin-settings', component: AdminSettingsComponent,
        data: { claimReq: claimReq.adminOnly }
      },
      {
        path: 'admin-or-teacher', component: AdminOrTeacherComponent,
        data: { claimReq: claimReq.adminOrTeacher }
      },
      {
        path: 'courses', component: CoursesComponent,
        data: { claimReq: claimReq.teacher }
      },
      {
        path: 'student-records', component: StudentRecordsComponent,
        data: { claimReq: claimReq.teacher }
      },
      {
        path: 'assignments', component: AssignmentsComponent,
        data: { claimReq: claimReq.teacher }
      },
      {
        path: 'schedules', component: SchedulesComponent,
        data: { claimReq: claimReq.teacher }
      },
      {
        path: 'apply-for-maternity-leave', component: ApplyForMaternityLeaveComponent,
        data: { claimReq: claimReq.femaleAndTeacher }
      },
      {
        path: 'student-dashboard', component: StudentDashboardComponent,
        data: { claimReq: claimReq.student }
      },
      {
        path: 'student-assignments', component: StudentAssignmentsComponent,
        data: { claimReq: claimReq.student }
      },
      {
        path: 'test-schedules', component: TestSchedulesComponent,
        data: { claimReq: claimReq.student }
      },
      {
        path: 'timetable', component: TimetableComponent,
        data: { claimReq: claimReq.student }
      },
      {
        path: 'user-dashboard', component: UserDashboardComponent,
        data: { claimReq: claimReq.user }
      },
      {
        path: 'contact-us', component: ContactUsComponent,
        data: { claimReq: claimReq.user }
      },
      {
        path: 'apply-for-admission', component: ApplyForAdmissionComponent,
        data: { claimReq: claimReq.user }
      },
      {
        path: 'apply-teacher', component: ApplyTeacherComponent,
        data: { claimReq: claimReq.user }
      },
      {
        path: 'library-members-only', component: LibraryMembersOnlyComponent,
        data: { claimReq: claimReq.hasLibraryId }
      },
      {
        path: 'under-10-and-female', component: Under10AndFemaleComponent,
        data: { claimReq: claimReq.femaleAndBelow10 }
      },
      {
        path: 'forbidden', component: ForbiddenComponent
      }
    ]
  },

];
