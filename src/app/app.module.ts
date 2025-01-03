import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SearchResultsComponent } from './components/common/search-results/search-results.component';
import { SimilarArticlesComponent } from './components/common/similar-articles/similar-articles.component';
import { StickyContactComponent } from './components/common/sticky-contact/sticky-contact.component';
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
import { ContactModalComponent } from './components/common/contact-modal/contact-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    AboutComponent,
    SolutionsComponent,
    SolutionsDetailsComponent,
    CaseStudiesComponent,
    CaseStudiesDetailsComponent,
    BlogComponent,
    BlogDetailsComponent,
    TeamComponent,
    PricingComponent,
    GalleryComponent,
    TestimonialsComponent,
    SignUpComponent,
    SignInComponent,
    ErrorComponent,
    FaqComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    SimilarArticlesComponent,
    SearchResultsComponent,
    FormationComponent,
    FormationsListComponent,
    StickyContactComponent,
    DevelopmentComponent,
    ContactModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxScrollTopModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
