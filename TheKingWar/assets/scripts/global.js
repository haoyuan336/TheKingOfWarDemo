/**
 * Created by chu on 2017/2/4 0004.
 */
import PlayerData from './player-data'
import {Eventuality} from './utitly/import'
const global = {
    playerData: PlayerData(),
    event: Eventuality({})
};
export default global;