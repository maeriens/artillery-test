# Artillery Stress Testing

PoC for Stress testing using [Artillery](https://artillery.io/). A
Nice video explaining some features available [here](https://www.youtube.com/watch?v=RNhZQq46A5c)

Artillery runs tests written in `yml` or `json` files.

```bash
  Commands:

    run [options] <script>    Run a test script. Example: `artillery run benchmark.json`
    quick [options] <target>  Run a quick test without writing a test script
    report [options] <file>   Create a report from a JSON file created by "artillery run"
    convert <file>            Convert JSON to YAML and vice versa
    dino [options]            Show dinosaur of the day
```

## Load

- Users arrive to the API
- Each user executes a Scenario (assing weight if necessary)
- Users arrive in phases
- Each user is independent

## Structure of a file

```yml
config:
  target: {url} # the url to test
  phases: # test phases are defined here
    - duration: 60 # The first line must have a '-' before
      arrivalRate: 20
      name: 'example' # Optional
  plugins:
    expect: {} # Load the expect plugin used below
    fuzzer: {} # Fuzzy testing plugin used below
  environments: # environments are set via the -e flag
    production: # each one can have phases inside
      target: 'http://wontresolve.prod:44321'
      phases:
        - duration: 120
          arrivalRate: 10
    staging:
      target: 'http://127.0.0.1:3003'
      phases:
        - duration: 1200
          arrivalRate: 20
  defaults:
    headers:
      x-my-service-auth: '987401838271002188298567'
scenarios:
  - name: 'A name' # optional
    weight: 1 # Possibility of a scenario happening when there are multiple ones
    flow:
    - name: 'Flow name' # Always optional
    - log: 'This is a log message' # Print to screen
    - get:
        url: '/docs' # Query params must be set here, apparently
        headers:
          Content-Type: 'application/json' # set headers
        capture: # Grab data from response
          json: '$.topLevelField' # Parsing the response as JSON
          as: 'topLevel' # Name of the stores variable
    - post: # Requests can be chained
        url: '/post/{{topLevel}}' # Using the previously stored variable
        expect: # Extra module that allows for assertions. Listed in package.json
    -
  - name: 'Fuzzy test'
    weight: 2
    flow:
      - name: 'Use fuzzy string'
        post:
          url: '/post/{{ naughtyString }}
```