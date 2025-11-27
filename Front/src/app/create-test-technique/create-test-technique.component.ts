import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestteschniqueService } from '../_services/testteschnique.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-test-technique',
    templateUrl: './create-test-technique.component.html',
    styleUrls: ['./create-test-technique.component.css']
})
export class CreateTestTechniqueComponent implements OnInit {


    testForm!: FormGroup;
    error = '';
    response = '';
    offreId: any

    constructor(private fb: FormBuilder, private testTechniqueService: TestteschniqueService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            this.offreId = params['id'];
        })
    }

    ngOnInit(): void {
        this.testForm = this.fb.group({
            testName: ['', Validators.required],
            questions: this.fb.array([])
        });
    }

    questions(): FormArray {
        return this.testForm.get('questions') as FormArray;
    }

    newQuestion(): FormGroup {
        return this.fb.group({
            description: '',
            options: this.fb.array([])
        });
    }

    addQuestion(): void {
        this.questions().push(this.newQuestion());
    }

    options(qIndex: number): FormArray {
        const question = this.questions().at(qIndex) as FormGroup;
        return question.get('options') as FormArray;
    }

    newOption(): FormGroup {
        return this.fb.group({
            text: '',
            correct: false
        });
    }

    addOption(qIndex: number): void {
        this.options(qIndex).push(this.newOption());
    }

    onSubmit(): void {
        const formValue = this.testForm.value;

        // Transformer en format requis
        const questionsFormatted = formValue.questions.reduce((acc: any, question: any) => {
            const optionsFormatted = question.options.reduce((optAcc: any, option: any) => {
                optAcc[option.text] = option.correct;
                return optAcc;
            }, {});

            acc[question.description] = optionsFormatted;
            return acc;
        }, {});

        // Convertir en chaîne de caractères JSON
        const formattedString = JSON.stringify(questionsFormatted);

        console.log(formattedString)
        const payload = {
            id: this.offreId,
            testName: formValue.testName,
            test: formattedString
        };
        this.testTechniqueService.createTest(payload).subscribe()

        this.router.navigate(['offresemploi'])


    }
}


