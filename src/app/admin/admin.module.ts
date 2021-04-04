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



@NgModule({
  declarations: [SourcedataComponent, ConditionComponent, SourceComponent, AddSourceComponent, EditSourceComponent, DeleteSourceComponent, ModifierComponent, AbilityComponent, FeatComponent, EquipmentComponent, SpellComponent, ClassComponent, RaceComponent, SpeedComponent, SkillComponent, SenseComponent, ProficiencyComponent, MagicSchoolComponent, DamageTypeComponent, AbilityScoreComponent, AddAbilityScoreComponent, EditAbilityScoreComponent, DeleteAbilityScoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'sourcedata', component: SourcedataComponent,
        children: [
          { path: 'abilityscore', component: AbilityScoreComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'condition', component: ConditionComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'source', component: SourceComponent, outlet: 'admin-sourcedata-outlet' }
        ]}
    ])
  ]
})
export class AdminModule { }
