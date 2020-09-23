import {
  Directive,
  AfterViewInit,
  OnInit,
  OnChanges,
  DoCheck,
  ElementRef,
  Renderer2,
  SimpleChanges,
  Input,
} from "@angular/core";

@Directive({
  selector: "[fittext]",
})
export class FitTextDirective
  implements AfterViewInit, OnInit, OnChanges, DoCheck {
  @Input() fittext? = true;
  @Input() compression? = 1;
  @Input() minFontSize?: number | "inherit" = 0;
  @Input() maxFontSize?: number | "inherit" = Number.POSITIVE_INFINITY;
  @Input() delay? = 100;
  @Input() ngModel;
  @Input() fontUnit?: "px" | "em" | string = "px";
  oldText = "";
  private fittextParent: HTMLElement;
  private fittextElement: HTMLElement;
  private fittextMinFontSize: number;
  private fittextMaxFontSize: number;
  private computed: CSSStyleDeclaration;
  private newlines: number;
  private lineHeight: string;
  private display: string;
  private calcSize = 10;
  private resizeTimeout;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.fittextElement = el.nativeElement;
    this.fittextParent = this.fittextElement.parentElement;
    this.computed = window.getComputedStyle(this.fittextElement);
    this.newlines =
      this.fittextElement.childElementCount > 0
        ? this.fittextElement.childElementCount
        : 1;
    this.lineHeight = this.computed["line-height"];
    this.display = this.computed["display"];
  }

  ngDoCheck() {
    if (this.oldText !== this.el.nativeElement.innerHTML) {
      this.setFontSize();
    }
    this.oldText = this.el.nativeElement.innerHTML;
  }

  public ngOnInit() {
    this.fittextMinFontSize =
      this.minFontSize === "inherit"
        ? this.computed["font-size"]
        : this.minFontSize;
    this.fittextMaxFontSize =
      this.maxFontSize === "inherit"
        ? this.computed["font-size"]
        : this.maxFontSize;
  }

  public ngAfterViewInit() {
    this.setFontSize();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes["compression"] && !changes["compression"].firstChange) {
      this.setFontSize();
    }
    if (changes["ngModel"]) {
      this.fittextElement.innerHTML = this.ngModel;
      this.setFontSize();
    }
  }

  private setFontSize = (): void => {
      if (
        this.fittextElement.offsetHeight * this.fittextElement.offsetWidth !==
        0
      ) {
        // reset to default
        this.setStyles(this.calcSize, 1, "inline-block");
        // set new
        this.setStyles(
          this.calculateNewFontSize(),
          this.lineHeight,
          this.display
        );
      }
    
  };

  private calculateNewFontSize = (): number => {
    const ratio =
      (this.calcSize * this.newlines) /
      this.fittextElement.offsetWidth /
      this.newlines;

    return Math.max(
      Math.min(
        (this.fittextParent.offsetWidth -
          (parseFloat(getComputedStyle(this.fittextParent).paddingLeft) +
            parseFloat(getComputedStyle(this.fittextParent).paddingRight)) -
          6) *
          ratio *
          this.compression,
        this.fittextMaxFontSize
      ),
      this.fittextMinFontSize
    );
  };

  private setStyles = (
    fontSize: number,
    lineHeight: number | string,
    display: string
  ): void => {
    this.renderer.setStyle(
      this.fittextElement,
      "fontSize",
      fontSize.toString() + this.fontUnit
    );
    this.renderer.setStyle(
      this.fittextElement,
      "lineHeight",
      lineHeight.toString()
    );
    this.renderer.setStyle(this.fittextElement, "display", display);
  };
}
