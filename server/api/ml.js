import express from 'express';
import fs from 'fs';
import BrainJSClassifier from 'natural-brain';
import util from 'util';

const router = express.Router();

const loadNeuralNet = util.promisify(BrainJSClassifier.load);


router.get('/', (req, res, next) => {
  try {
    let rawdata = fs.readFileSync('cleaned.json');
    let cleanResults = JSON.parse(rawdata);
    res.status(200).send(cleanResults);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('error in ml');
  }
});

router.post('/', (req, res, next) => {
    try {
        const { classified } = req.body;
        const classifiedJSON = JSON.stringify(classified);
        fs.writeFileSync('classifiedSet.json', classifiedJSON, (e) => {
            if (e) console.log(e)
        });
        res.status(200).send('success');
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/train', (req, res, next) => {
  try {
    const { input, output } = req.body;
    loadNeuralNet('trained_classifier.json', null, null)
    .then(neuralNet => {
      neuralNet.addDocument( input, output );
      neuralNet.train();
      neuralNet.save('trained_classifier.json', function () {});
    })
    .then(() => res.status(200).send('success'));
  }
  catch (e) {
    console.log(e);
  }
});

router.post('/classify', (req, res, next) => {
  try {
    const { doc } = req.body;
    loadNeuralNet('trained_classifier.json', null, null)
    .then(neuralNet => {
      const tag = neuralNet.classify(doc);
      res.status(200).send(tag);
    })
    .catch(e => {
      res.status(500).send('neural net error', e)
    })
  }
  catch (e) {
    res.status(500).send('neural net error');
  }
});

export default router;
