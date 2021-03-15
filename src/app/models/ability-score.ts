export class AbilityScore {
    public id: string;
    public name: string;
    public description: string;
    public max_value: number;
    public base_value: number;
    public value_modifier: number;
    public value_override: number;
    public current_value: number;
    public modifier: number;
    public saving_throw_modifier: number;
    public saving_throw_proficiency: boolean;

    constructor(
        id: string,
        name: string,
        description: string,
        max_value: number,
        base_value: number,
        value_modifier: number,
        value_override: number,
        current_value: number,
        modifier: number,
        saving_throw_modifier: number,
        saving_throw_proficiency: boolean
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.max_value = max_value
        this.base_value = base_value
        this.value_modifier = value_modifier
        this.value_override = value_override
        this.current_value = current_value
        this.modifier = modifier
        this.saving_throw_modifier = saving_throw_modifier
        this.saving_throw_proficiency = saving_throw_proficiency
    }

}
