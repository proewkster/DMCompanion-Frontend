import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcedataComponent } from './components/sourcedata/sourcedata.component';
import { ConditionComponent } from './components/sourcedata/basedata/condition/condition.component';
import { SourceComponent } from './components/sourcedata/source/source.component';
import { AddSourceComponent } from './components/sourcedata/source/add-source/add-source.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditSourceComponent } from './components/sourcedata/source/edit-source/edit-source.component';
import { DeleteSourceComponent } from './components/sourcedata/source/delete-source/delete-source.component';
import { ModifierComponent } from './components/sourcedata/modifier/modifier.component';
import { AbilityComponent } from './components/sourcedata/ability/ability.component';
import { FeatComponent } from './components/sourcedata/feat/feat.component';
import { EquipmentComponent } from './components/sourcedata/equipment/equipment.component';
import { SpellComponent } from './components/sourcedata/spell/spell.component';
import { ClassComponent } from './components/sourcedata/class/class.component';
import { RaceComponent } from './components/sourcedata/race/race.component';
import { SpeedComponent } from './components/sourcedata/basedata/speed/speed.component';
import { SkillComponent } from './components/sourcedata/basedata/skill/skill.component';
import { SenseComponent } from './components/sourcedata/basedata/sense/sense.component';
import { ProficiencyComponent } from './components/sourcedata/basedata/proficiency/proficiency.component';
import { MagicSchoolComponent } from './components/sourcedata/basedata/magic-school/magic-school.component';
import { DamageTypeComponent } from './components/sourcedata/basedata/damage-type/damage-type.component';
import { AbilityScoreComponent } from './components/sourcedata/basedata/ability-score/ability-score.component';
import { AddAbilityScoreComponent } from './components/sourcedata/basedata/ability-score/add-ability-score/add-ability-score.component';
import { EditAbilityScoreComponent } from './components/sourcedata/basedata/ability-score/edit-ability-score/edit-ability-score.component';
import { DeleteAbilityScoreComponent } from './components/sourcedata/basedata/ability-score/delete-ability-score/delete-ability-score.component';
import { AddConditionComponent } from './components/sourcedata/basedata/condition/add-condition/add-condition.component';
import { EditConditionComponent } from './components/sourcedata/basedata/condition/edit-condition/edit-condition.component';
import { DeleteConditionComponent } from './components/sourcedata/basedata/condition/delete-condition/delete-condition.component';
import { AddDamageTypeComponent } from './components/sourcedata/basedata/damage-type/add-damage-type/add-damage-type.component';
import { EditDamageTypeComponent } from './components/sourcedata/basedata/damage-type/edit-damage-type/edit-damage-type.component';
import { DeleteDamageTypeComponent } from './components/sourcedata/basedata/damage-type/delete-damage-type/delete-damage-type.component';
import { AddMagicSchoolComponent } from './components/sourcedata/basedata/magic-school/add-magic-school/add-magic-school.component';
import { EditMagicSchoolComponent } from './components/sourcedata/basedata/magic-school/edit-magic-school/edit-magic-school.component';
import { DeleteMagicSchoolComponent } from './components/sourcedata/basedata/magic-school/delete-magic-school/delete-magic-school.component';
import { AddProficiencyComponent } from './components/sourcedata/basedata/proficiency/add-proficiency/add-proficiency.component';
import { EditProficiencyComponent } from './components/sourcedata/basedata/proficiency/edit-proficiency/edit-proficiency.component';
import { DeleteProficiencyComponent } from './components/sourcedata/basedata/proficiency/delete-proficiency/delete-proficiency.component';
import { AddSenseComponent } from './components/sourcedata/basedata/sense/add-sense/add-sense.component';
import { EditSenseComponent } from './components/sourcedata/basedata/sense/edit-sense/edit-sense.component';
import { DeleteSenseComponent } from './components/sourcedata/basedata/sense/delete-sense/delete-sense.component';
import { AddSkillComponent } from './components/sourcedata/basedata/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/sourcedata/basedata/skill/edit-skill/edit-skill.component';
import { DeleteSkillComponent } from './components/sourcedata/basedata/skill/delete-skill/delete-skill.component';
import { AddSpeedComponent } from './components/sourcedata/basedata/speed/add-speed/add-speed.component';
import { EditSpeedComponent } from './components/sourcedata/basedata/speed/edit-speed/edit-speed.component';
import { DeleteSpeedComponent } from './components/sourcedata/basedata/speed/delete-speed/delete-speed.component';
import { AddRaceComponent } from './components/sourcedata/race/add-race/add-race.component';
import { EditRaceComponent } from './components/sourcedata/race/edit-race/edit-race.component';
import { DeleteRaceComponent } from './components/sourcedata/race/delete-race/delete-race.component';
import { AddFeatComponent } from './components/sourcedata/feat/add-feat/add-feat.component';
import { EditFeatComponent } from './components/sourcedata/feat/edit-feat/edit-feat.component';
import { DeleteFeatComponent } from './components/sourcedata/feat/delete-feat/delete-feat.component';



@NgModule({
  declarations: [SourcedataComponent, ConditionComponent, SourceComponent, AddSourceComponent, EditSourceComponent, DeleteSourceComponent, ModifierComponent, AbilityComponent, FeatComponent, EquipmentComponent, SpellComponent, ClassComponent, RaceComponent, SpeedComponent, SkillComponent, SenseComponent, ProficiencyComponent, MagicSchoolComponent, DamageTypeComponent, AbilityScoreComponent, AddAbilityScoreComponent, EditAbilityScoreComponent, DeleteAbilityScoreComponent, AddConditionComponent, EditConditionComponent, DeleteConditionComponent, AddDamageTypeComponent, EditDamageTypeComponent, DeleteDamageTypeComponent, AddMagicSchoolComponent, EditMagicSchoolComponent, DeleteMagicSchoolComponent, AddProficiencyComponent, EditProficiencyComponent, DeleteProficiencyComponent, AddSenseComponent, EditSenseComponent, DeleteSenseComponent, AddSkillComponent, EditSkillComponent, DeleteSkillComponent, AddSpeedComponent, EditSpeedComponent, DeleteSpeedComponent, AddRaceComponent, EditRaceComponent, DeleteRaceComponent, AddFeatComponent, EditFeatComponent, DeleteFeatComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'sourcedata', component: SourcedataComponent,
        children: [
          { path: 'abilityscore', component: AbilityScoreComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'condition', component: ConditionComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'damagetype', component: DamageTypeComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'magicschool', component: MagicSchoolComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'proficiency', component: ProficiencyComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'sense', component: SenseComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'skill', component: SkillComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'speed', component: SpeedComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'race' , component: RaceComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'feat' , component: FeatComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'source', component: SourceComponent, outlet: 'admin-sourcedata-outlet' }
        ]}
    ])
  ]
})
export class AdminModule { }
