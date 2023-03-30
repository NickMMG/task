import Edication from './Edication';
import OneCard from './OneCard';

type State = {
  employeeList: OneCard[];
  edicationList: Edication[];
  error?: string;
};

export default State;
