import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SolutionsComponent } from './components/pages/solutions/solutions.component';
import { SolutionsDetailsComponent } from './components/pages/solutions-details/solutions-details.component';
import { CaseStudiesComponent } from './components/pages/case-studies/case-studies.component';
import { CaseStudiesDetailsComponent } from './components/pages/case-studies-details/case-studies-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { TeamComponent } from './components/pages/team/team.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/pages/contact/contact.component';

const routes: Routes = [
    {path: '', component: HomeOneComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'solutions', component: SolutionsComponent},
    {path: 'solutions-details', component: SolutionsDetailsComponent},
    {path: 'case-studies', component: CaseStudiesComponent},
    {path: 'case-studies-details', component: CaseStudiesDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
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
    // Here add new pages component

    {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }