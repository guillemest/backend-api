define({ "api": [
  {
    "type": "delete",
    "url": "/colores/:id",
    "title": "Eliminar color",
    "group": "Colores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del color.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Color eliminado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ColorNotFound",
            "description": "<p>Color no encontrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"message\": \"Color no encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/colores.js",
    "groupTitle": "Colores",
    "name": "DeleteColoresId"
  },
  {
    "type": "get",
    "url": "/colores/",
    "title": "Obtener colores",
    "group": "Colores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de registros.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Pagina a solicitar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "xmlResponse",
            "description": "<p>Si se desea la respuesta en xml enviar en 1.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Nombre del color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Color",
            "description": "<p>Cadena RGB del color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Pantone",
            "description": "<p>Control del color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Year",
            "description": "<p>Año del color.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JSON Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\": \"5f17a99fe29f02e6b5f009fa\",\n  \"Name\": \"Sand Dollar\",\n  \"Color\": \"#DECDBE\"\n  \"Pantone\": \"13-1106\"\n  \"Year\": 2020\n}]",
          "type": "json"
        },
        {
          "title": "JSON Success-Response:",
          "content": "HTTP/1.1 200 OK\n[]",
          "type": "json"
        },
        {
          "title": "XML Success-Response:",
          "content": "HTTP/1.1 200 OK\n <?xml version='1.0'?>\n <result>\n     <result>\n         <Id>5f19a216c15e4f84482974da</Id>\n         <Name>Sand Dollar</Name>\n         <Color>#DECDBE</Color>\n         <Pantone>13-1106</Pantone>\n         <Year>2020</Year>\n     </result>\n     <total>1</total>\n     <currentPage>1</currentPage>\n     <pages>1</pages>\n </result>",
          "type": "json"
        },
        {
          "title": "XML Success-Response:",
          "content": "HTTP/1.1 200 OK\n <?xml version='1.0'?>\n <result>\n     <total>0</total>\n     <currentPage>1</currentPage>\n     <pages>0</pages>\n </result>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/colores.js",
    "groupTitle": "Colores",
    "name": "GetColores"
  },
  {
    "type": "get",
    "url": "/colores/:id",
    "title": "Obtener color",
    "group": "Colores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del color.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5f17a99fe29f02e6b5f009fa\",\n  \"Name\": \"Sand Dollar\",\n  \"Color\": \"#DECDBE\"\n  \"Pantone\": \"13-1106\"\n  \"Year\": 2020\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ColorNotFound",
            "description": "<p>Color no encontrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"message\": \"Color no encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/colores.js",
    "groupTitle": "Colores",
    "name": "GetColoresId"
  },
  {
    "type": "post",
    "url": "/colores/",
    "title": "Crear color",
    "group": "Colores",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Nombre del color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Color",
            "description": "<p>Cadena RGB del color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Pantone",
            "description": "<p>Control del color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Year",
            "description": "<p>Año del color.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Color creado correctamente\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Error de servidor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Error interno\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/colores.js",
    "groupTitle": "Colores",
    "name": "PostColores"
  },
  {
    "type": "put",
    "url": "/colores/:id",
    "title": "Actualizar color",
    "group": "Colores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del color.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Color actualizado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ColorNotFound",
            "description": "<p>Color no encontrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"message\": \"Color no encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/colores.js",
    "groupTitle": "Colores",
    "name": "PutColoresId"
  }
] });
