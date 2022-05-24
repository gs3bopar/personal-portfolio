import { EXPERIENCES, ABOUT_ME, CONTACT_ME, MODAL } from '../../constants';
import "./Modal.css";


const Modal = ({ enemiesHit, setEnemiesHit }) => {
  const showHideClassName = Object.values(enemiesHit).includes(true) ? "modal display-block" : "modal display-none";

  const closeAllModals = (e) => {
    e.preventDefault();
    setEnemiesHit(
      {
        [ABOUT_ME.STRING]: false,
        [EXPERIENCES.STRING]: false,
        [CONTACT_ME.STRING]: false
      }
    );
  }

  // useEffect(() => {
  //   // more than one true, choose first one to be true else all false
  //   for (const [key, value] in Object.entries(enemiesHit)) {
  //   }
  // }, []);

  return (
    <div className={showHideClassName}>

      <section className="modal-main">
      {
      enemiesHit && enemiesHit[ABOUT_ME.STRING] &&
        <>
          <h2>{ABOUT_ME.NAME}</h2>
          <h3>{ABOUT_ME.WORKING}</h3>
          <h2>{ABOUT_ME.MY_STORY_STRING}</h2>
          <h3>{ABOUT_ME.MY_STORY_EXPLAIN}</h3>
        </>
      }

      {
      enemiesHit && enemiesHit[EXPERIENCES.STRING] &&
        <>
        <div className='sameLineFlex'>
          <h2 className='company-logos'>
              <div className="td-securities"></div>
              {EXPERIENCES.TD_SECURITIES}
          </h2>
          <h3>{EXPERIENCES.TD_SECURITIES_OCCUPATION}</h3>
        </div>

        <div className='sameLineFlex'>
          <h2 className='company-logos'>
            <div className="tmu"></div>
            {EXPERIENCES.RYERSON_UNIVERSITY}
          </h2>  
          <h3>{EXPERIENCES.RYERSON_UNIVERSITY_OCCUPATION}</h3>
        </div>

        <div className='sameLineFlex'>
          <h2 className='company-logos'>
            <div className="lifion-by-adp"></div>
            {EXPERIENCES.LIFION_BY_ADP}
          </h2>
          <h3>{EXPERIENCES.LIFION_BY_ADP_OCCUPATION}</h3>
        </div>

        <div className='sameLineFlex'>
          <h2 className='company-logos'>
            <div className="stratus-360"></div>
            {EXPERIENCES.STRATUS_360_INC}
          </h2>
          <h3>{EXPERIENCES.STRATUS_360_INC_OCCUPATION}</h3>
        </div>

        <div className='sameLineFlex'>
          <h2 className='company-logos'>
            <div className="ibi-group"></div>
            {EXPERIENCES.IBI_GROUP}
          </h2>
          <h3>{EXPERIENCES.IBI_GROUP_OCCUPATION}</h3>
        </div>

        </>
      }

      {
      enemiesHit && enemiesHit[CONTACT_ME.STRING] &&
        <>
          <div className='contact-Info'>
            <a href={CONTACT_ME.LINKEDIN_LINK} target="_blank" rel="noreferrer">
              <div className="linkedin"></div>
            </a>
            <a href={CONTACT_ME.GITHUB_LINK} target="_blank" rel="noreferrer">
              <div className="github"></div>
            </a>
            <a href={CONTACT_ME.EMAIL_LINK} target="_blank" rel="noreferrer">
              <div className="email"></div>
            </a>
          </div>
        </>
      }

        <button className='close-button' onClick={e => closeAllModals(e)}>
          {MODAL.CLOSE}
        </button>

      </section>

    </div>
  );
};

export default Modal;