  let opt = new StaticOptionSource(options["keyName"], options["valueName"], new Array<Map<string, string>>())
        if (options.type === "static") {
            let values = new Array<Map<string, string>>()
            options["values"].map((value: Map<string, string>) => {
                let m = new Map<string, string>()
                m.set(options["keyName"], value.get(options["keyName"]))
                m.set(options["valueName"], value[options["valueName"]])
                values.push(m)
            })
            opt = new StaticOptionSource(options["keyName"], options["valueName"], values)
        }





        