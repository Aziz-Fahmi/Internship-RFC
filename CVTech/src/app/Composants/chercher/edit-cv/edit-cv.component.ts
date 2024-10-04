import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CV } from '../../../models/CV';
import { CVService } from '../../../services/cv.service';

@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.css']
})
export class EditCvComponent {
  @Input() cv?: CV;
  @Output() CVUpdated = new EventEmitter<CV[]>();

  constructor(private CVService: CVService) {}

  ngOnInit(): void {}

  updateCV(cv: CV) {
    this.CVService
      .updateCV(cv)
      .subscribe((heroes: CV[]) => this.CVUpdated.emit(heroes));
  }

  deleteCV(hero: CV) {
    this.CVService
      .deleteCV(hero)
      .subscribe((heroes: CV[]) => this.CVUpdated.emit(heroes));
  }

  createCV(hero: CV) {
    this.CVService
      .createCV(hero)
      .subscribe((cvs: CV[]) => this.CVUpdated.emit(cvs));
  }
}
