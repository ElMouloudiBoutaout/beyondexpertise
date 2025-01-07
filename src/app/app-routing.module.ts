import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { CaseStudiesDetailsComponent } from './components/pages/case-studies-details/case-studies-details.component';
import { CaseStudiesComponent } from './components/pages/case-studies/case-studies.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DevelopmentComponent } from './components/pages/development/development.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { FormationComponent } from './components/pages/formation/formation.component';
import { FormationsListComponent } from './components/pages/formations-list/formations-list.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { SolutionsDetailsComponent } from './components/pages/solutions-details/solutions-details.component';
import { SolutionsComponent } from './components/pages/solutions/solutions.component';
import { TeamComponent } from './components/pages/team/team.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { HomeTemplateComponent } from './components/pages/home-template/home-template.component';

const routes: Routes = [
    {path: '', component: HomeOneComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'consulting', component: AboutComponent},
    {path: 'solutions', component: SolutionsComponent},
    {path: 'solutions-details', component: SolutionsDetailsComponent},
    {path: 'case-studies', component: CaseStudiesComponent},
    {path: 'case-studies-details', component: CaseStudiesDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details/:id', component: BlogDetailsComponent},
    {path: 'team', component: TeamComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'terms-condition', component: TermsConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'contact', component: ContactComponent},
    { path: 'formation/:id', component: FormationComponent },
    { path: 'formation', component: FormationComponent },
    { path: 'formations-list', component: FormationsListComponent },
    {path: 'development', component: DevelopmentComponent},
    { path: 'landing/:formationName', component: HomeTemplateComponent },
    // Here add new pages component

    {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list

];

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    onSameUrlNavigation: 'reload'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
