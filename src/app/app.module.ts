import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { AxisComponent } from './radar-vote/voting-radar/axis/axis.component';
import { VotingRadarComponent } from './radar-vote/voting-radar/voting-radar.component';
import { VotedRadarComponent } from './radar-vote/voted-radar/voted-radar.component';
import { ResultsComponent } from './results/results.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { IndexComponent } from './index/index.component';
import { RadarRowComponent } from './index/radar-row/radar-row.component';
import { RadarTemplateCardComponent } from './index/radar-template-card/radar-template-card.component';
import { RadarTemplatePreViewComponent } from './index/radar-template-pre-view/radar-template-pre-view.component';
import { RadarTemplateIndexDetailsComponent } from './index/radar-template-index-details/radar-template-index-details.component';
import { ButtonWithIconComponent } from './commons/buttons/button-with-icon.component';
import { HeaderFiltersComponent } from './index/header-filters/header-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateRadarComponent } from './create-radar/create-radar.component';
import { CreateRadarTemplateComponent } from './create-radar-template/create-radar-template.component';
import { RadarTemplateFormComponent } from './create-radar-template/radar-template-form/radar-template-form.component';
import { RadarFormComponent } from './create-radar/radar-form/radar-form.component';
import { AxesFormComponent } from './create-radar/axes-form/axes-form.component';
import { TokenComponent } from './token/token.component';
import { ErrorComponent } from './error/error.component';
import {TokenService} from '../services/token.service';
import { SelectToCompareComponent } from './select-to-compare/select-to-compare.component';
import { CompareRadarsComponent } from './compare-radars/compare-radars.component';
import { AxisBarChartComponent } from './chart-components/axis-bar-chart/axis-bar-chart.component';
import { AxisTableValuesComponent } from './chart-components/axis-table-values/axis-table-values.component';
import { RadarChartComponent } from './chart-components/radar-chart/radar-chart.component';
import { CompareRadarsButtonsComponent } from './compare-radars/compare-radars-buttons/compare-radars-buttons.component';
import { HttpRadarService } from 'src/services/http-radar.service';
import { HttpRadarTemplateService } from 'src/services/http-radarTemplate.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpConfigInterceptor } from 'src/interceptor/httpconfig.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RadarVoteComponent,
    AxisComponent,
    VotingRadarComponent,
    VotedRadarComponent,
    ResultsComponent,
    CardContainerComponent,
    AxisBarChartComponent,
    AxisTableValuesComponent,
    RadarChartComponent,
    IndexComponent,
    RadarRowComponent,
    RadarTemplateCardComponent,
    RadarTemplatePreViewComponent,
    RadarTemplateIndexDetailsComponent,
    ButtonWithIconComponent,
    HeaderFiltersComponent,
    CreateRadarComponent,
    CreateRadarTemplateComponent,
    RadarTemplateFormComponent,
    RadarFormComponent,
    AxesFormComponent,
    TokenComponent,
    ErrorComponent,
    SelectToCompareComponent,
    CompareRadarsComponent,
    CompareRadarsButtonsComponent,
    SignInComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    FormsModule
  ],
  providers: [
    {provide: 'RadarService', useClass: HttpRadarService},
    {provide: 'RadarTemplateService', useClass: HttpRadarTemplateService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
