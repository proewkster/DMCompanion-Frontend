import { DynamicFormControl_Text } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-text';
import { SourceData_Spell } from './sourcedata_spell';
import { SourceData_AbilityScore } from './sourcedata_abilityscore';
import { SourceData_Modifier } from './sourcedata_modifier';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { Observable, of } from 'rxjs';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { SpellLists } from 'src/app/enums/spell-list.enum';

export class SourceData_Modifier_Spell_Add extends SourceData_Modifier {
    level: number;
    spellList: string;
    spellcastingAbility: SourceData_AbilityScore;
    spell: SourceData_Spell;

    modifierType = ModifierType.Spell_Add;

    abilityScoreOptions: SourceData_AbilityScore[];
    spellOptions: SourceData_Spell[];

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Number ({
                key: "level",
                label: "Casting Level",
                value: this.level,
                required: true,
                range: true,
                rangeMin: 0,
                rangeMax: 9,
                order: 3
            }),

            new DynamicFormControl_Select ({
                key: "spellList",
                label: "Spell List",
                value: this.spellList || '',
                required: true,
                order: 4,
                options: DynamicFormConverters.enumAsOptions(SpellLists)
            }),
            
            new DynamicFormControl_Select ({
                key: "abilityScoreId",
                label: "SpellCasting Ability",
                value: this.spellcastingAbility?.id || '',
                required: true,
                order: 5,
                options: DynamicFormConverters.baseDataAsOptions(this.abilityScoreOptions)
            }),

            new DynamicFormControl_Select ({
                key: "spellId",
                label: "Spell",
                value: this.spell?.id || '',
                required: true,
                order: 6,
                options: DynamicFormConverters.SpellsAsOptions(this.spellOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}