/**
 *Genel Anket kontratıdır.
 */
import {getDateIsoDate} from "../Types/Common";

export class VoteContract {
    voteId;
    voteCode;
    name;
    apartmentId;
    userChoice;
    description;
    isActive;
    startDate;
    endDate;
    /**
     * oy pusulası
     */
    optionList;
    userChoiceList;
    constructor() {
        this.userChoice = new VoteItem();
        this.startDate = getDateIsoDate();
        this.endDate = getDateIsoDate();
        this.name = '';
        this.apartmentId = 0;
        this.optionList = [];
        this.userChoiceList = [];
    }
}

/**
 * kullanıcı seçimidir. 
 */
export class VoteItem{
    voteOption;
    userHash;
    userId;
    constructor() {
        this.voteOption = new VoteOption();
        this.userHash = '';
    }
}
/**
 * seçim pusulasındaki her bir seçenektir
 */
export class VoteOption{
    code;
    description;
}

/**
 * seçim sonuç kontratı
 */
export class VoteResultContract{
    voteId;
    name;
    apartmentId;
    optionCode;
    optionDescription;
    voteCount;
}