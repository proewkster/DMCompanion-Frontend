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
    SOURCEDATA_SOURCE = "/sourcedata/source"
}