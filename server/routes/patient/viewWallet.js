var router = require('express').Router();
const { viewWalletNumber } = require('../../controllers/patient/viewPatientWalletController');
const { authenticateToken } = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, viewWalletNumber);

module.exports = router;

//<div className={styles.walletAmount}>
              //<img src={moneyImage} alt="Money Icon" className={styles.moneyIcon} />
          //  </div>