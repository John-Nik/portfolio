import DestroyMsg from './DestroyMsg';
import FlagMsg from './FlagMsg';
import InitMsg from './InitMsg';
import PauseMsg from './PauseMsg';
import ResetMsg from './ResetMsg';
import ResizeMsg from './ResizeMsg';

type Msg = InitMsg | ResizeMsg | ResetMsg | PauseMsg | DestroyMsg | FlagMsg;

export default Msg;
