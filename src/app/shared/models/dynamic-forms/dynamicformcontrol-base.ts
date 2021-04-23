export abstract class DynamicFormControl_Base<T> {
    
    // Form display properties
    value: T; // current value for the control
    key: string; // identifier of the form control, used for linking control with data property
    label: string; // Defines label displayed with form control
    order: number; // Defines order of the control on the form
    controlType: string; // Defines the main input type (like input, dropdown, ...)
    type: string; // Defines input's subtype (like password, email, ... for textbox input)
    stepSize: number; // Defines step size for number inputs
    rows: number; // Defines number of rows for textarea form control
    options: {key: string, value: string}[]; // Defines options displayed in a dropdown menu

    // Form validation properties
    required: boolean;
    maxLength: boolean;
    maxLengthValue: number;
    range: boolean;
    rangeMin: number;
    rangeMax: number;

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        order?: number;
        controlType?: string;
        type?: string;
        stepSize?: number;
        rows?: number;
        options?: {key: string, value: string}[];
        required?: boolean;
        maxLength?: boolean;
        maxLengthValue?: number;
        range?: boolean;
        rangeMin?: number;
        rangeMax?: number;
        } = {}) 
    {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.stepSize = options.stepSize === undefined ? 1 : options.stepSize;
        this.rows = options.rows === undefined ? 1 : options.rows;
        this.options = options.options || [];
        
        this.required = !!options.required;
        this.maxLength = !!options.maxLength;
        this.maxLengthValue = options.maxLengthValue === undefined ? 100 : options.maxLengthValue;
        this.range = !!options.range;
        this.rangeMin = options.rangeMin === undefined ? 0 : options.rangeMin;
        this.rangeMax = options.rangeMax === undefined ? this.rangeMax + 1 : options.rangeMax;
    }
}