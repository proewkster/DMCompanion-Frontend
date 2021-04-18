import { SourceData_BaseData } from "src/app/admin/models/sourcedata/sourcedata_basedata";
import { SourceData_Spell } from "src/app/admin/models/sourcedata/sourcedata_spell";

export class DynamicFormConverters {
    // Converts a list of BaseData objects to a list of options for a Dynamic Form Control - Select
    // Accepts all derived types of BaseData
    static baseDataAsOptions = (baseData: SourceData_BaseData[]) => {

        let result: {key: string, value: string}[] = [];
        
        baseData.forEach(item => {
            result.push({
                key: item.id,
                value: item.name
            })
        });

        return result;
    }

    // Converts a list of Spell objects to a list of options for a Dynamic Form Control - Select
    static SpellsAsOptions = (spells: SourceData_Spell[]) => {
        let result: {key: string, value: string}[] = [];
        
        spells.forEach(item => {
            result.push({
                key: item.id,
                value: item.name
            })
        });

        return result;
    }

    // Convert an enum to a list of options for a Dynamic Form Control - Select
    static enumAsOptions = (enumInput: any) => {
        let result: {key: string, value: string}[] = [];
        let keys = Object.keys;

        keys(enumInput).forEach(key => {
            result.push({
                key: key,
                value: enumInput[key]
            })
        })

        return result;        
    }
}