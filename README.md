# FastCards

FastCards is an easy-to-use API for fetching flashcards given a topic. All flashcards provided by the public API are from fetched from [Cram](https://www.cram.com/).

## Public API

To use the API, request the following URL.

**POST**
```
https://fastcardsapi.herokuapp.com/api/flashcards
```

## Usage

**Endpoints:**

`POST /api/flashcards` This endpoint requests flashcards of some provided topic.

- `query`**(required)**: A string containing the flashcard subject/topic.
- `max`(optional): A number specifying the maximum number of flashcards to return. If not provided, the default is 10.

Example Request:
```json
{
   "query": "hematology",
   "max": 5
}
```
A successful response will contain 3 keys:
- `from_url`: The [Cram](https://www.cram.com/) URL from which the flashcards were fetched.
- `number_of_flashcards`: The number of flashcards provided. The value will be >= `max`.
- `flashcards`: List of flashcards. Each list element contains a `question` and `answer` key.

Example Response:
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
    "from_url": "https://www.cram.com/flashcards/hematology-2282407",
    "number_of_flashcards": 5,
    "flashcards": [{
        "question": "What are conditions associated with elliptocytes/Ovalcytes",
        "answer": "Hereditary Elliptocytosis"
    }, {
        "question": "What are conditions associated with Schistocytes?",
        "answer": "Microangiopathic hemolytic anemias such as:"
    }, {
        "question": "What are conditions associated with Target Cells on blood film?",
        "answer": "Liver disease, Sickle Cell disease, thalassemia, iron deficiency, asplenia"
    }, {
        "question": "What are conditions associated with teardrop cell/dacrocytes on blood film?",
        "answer": "Myelofibrosis"
    }, {
        "question": "Acanthocytes, which conditions",
        "answer": "Severe liver disease, starvation/anorexia, post-splenectomy"
    }]
}
```
Requests are rate-limited to 20 requests/minute. If more requests are required for your project, feel free to contact me on discord (**Treephones#4601**) to (maybe) get an unlimited key.


## License
FastCards is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.