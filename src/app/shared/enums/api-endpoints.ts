export enum ApiEndPoints {
    // Authentication Endpoints
    REGISTER = "/authentication/register",
    CONFIRMEMAIL = "/authentication/emailconfirmation",
    LOGIN = "/authentication/login",
    FORGOTPASSWORD = "/authentication/forgotpassword",
    RESETPASSWORD = "/authentication/resetpassword",

    // SourceData Endpoints
    SOURCEDATA_ABILITYSCORE = "/sourcedata/abilityscore",
    SOURCEDATA_CONDITION = "/sourcedata/condition",
    SOURCEDATA_DAMAGETYPE = "/sourcedata/damagetype",
    SOURCEDATA_MAGICSCHOOL = "/sourcedata/magicschool",
    SOURCEDATA_PROFICIENCY = "/sourcedata/proficiency",
    SOURCEDATA_SENSE = "/sourcedata/sense",
    SOURCEDATA_SKILL = "/sourcedata/skill",
    SOURCEDATA_SPEED = "/sourcedata/speed",
    SOURCEDATA_RACE = "/sourcedata/race",
    SOURCEDATA_FEAT = '/sourcedata/feat',
    SOURCEDATA_ABILITY = '/sourcedata/ability',
    SOURCEDATA_MELEEATTACK = '/sourcedata/meleeattack',
    SOURCEDATA_RANGEDATTACK = '/sourcedata/rangedattack',
    SOURCEDATA_CASTSPELL = '/sourcedata/castspell',
    SOURCEDATA_MODIFIER = '/sourcedata/modifier',
    SOURCEDATA_SPELL = '/sourcedata/spell',
    SOURCEDATA_SOURCE = "/sourcedata/source",

    // Branching Endpoints
    BRANCHING_RACE = "/branching/race",
    BRANCHING_FEAT = "/branching/feat",
    BRANCHING_ABILITY = "/branching/ability",
    BRANCHING_MODIFIER = "/branching/modifier",
    BRANCHING_SPELL = "/branching/spell",

    //Character endpoints
    CHARACTERDATA_CHARACTER = "/CharacterData/Character"
}