export enum ApiEndPoints {
    // Authentication Endpoints
    REGISTER = "/authentication/register",
    CONFIRMEMAIL = "/authentication/emailconfirmation",
    LOGIN = "/authentication/login",
    FORGOTPASSWORD = "/authentication/forgotpassword",
    RESETPASSWORD = "/authentication/resetpassword",

    //User Endpoints
    USER_DATA = "/User/GetUserData",
    USER_UPDATE = "/User/UpdateUser",
    USER_UPDATEPASSWORD = "/User/UpdatePassword",
    USER_UPDATEEMAIL = "/User/UpdateEmail",
    CONFIRMUPDATEDEMAIL = "/user/EmailConfirmation",
    DOWNLOADPERSONALDATA = "/user/DownloadUserData",

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

    //Character endpoints
    CHARACTERDATA_CHARACTER = "/CharacterData/Character"
}