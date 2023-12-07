import datetime
import gzip
import json
import logging
import math
import os
import pytz
import sys
import requests

class HTTPHandler(logging.Handler):
    def __init__(
        self,
        url,
        host=os.environ.get("HTTP_LOG_HOST", ""),
        name=None,
        compressed=False,
        source_name=None,
        scheme="https"
    ):
        logging.Handler.__init__(self)        
        self.endpoint = '{}://{}{}'.format(scheme, host, url)
        self.name = name
        self.compressed = compressed
        self.source_name = source_name

    @staticmethod
    def is_json(data):
        try:
            json.loads(data)
            return True
        except:
            return False
    
    def emit(self, record):
        try:
            _data = self.format(record)
            headers = self.get_headers(_data)
            print(self.convert_size(sys.getsizeof(_data)))
            if self.compressed:
                packet = self.compress_data(_data)
            else:
                packet = _data
            print(self.convert_size(sys.getsizeof(packet)))
            # session = requests.Session()
            # session.post(self.endpoint, headers=headers, data=packet)
        except (KeyboardInterrupt, SystemExit):
            raise
        except:
            self.handleError(record)

    def get_headers(self, data):
        headers = {}
        if self.compressed:
            headers['Content-Encoding'] = 'gzip'
        if self.is_json(data):
            headers['Content-Type'] = 'application/json'
        headers['Accept'] = 'application/json'
        
        print(f"headers => {headers}")        
        return headers

    def compress_data(self, data):
        json_data = json.dumps(data, indent=2)
        encoded = json_data.encode("utf-8")
        return gzip.compress(encoded)

    def convert_size(self, size_bytes):
        if size_bytes == 0:
            return "0B"
        size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)
        return f"{s}{size_name[i]}"

class TZOffsetFormatter(logging.Formatter):
    def __init__(self, format, datefmt, timezone="UTC"):
        super(TZOffsetFormatter, self).__init__(format, datefmt)
        self.timezone = timezone
    
    def converter(self, timestamp):
        dt = datetime.datetime.fromtimestamp(timestamp)
        tzinfo = pytz.timezone(self.timezone)
        return dt.astimezone(tz=tzinfo)

    def formatTime(self, record, datefmt=None):
        dt = self.converter(record.created)
        if datefmt:
            s = dt.strftime(datefmt)
        else:
            try:
                s = dt.isoformat(timespec="milliseconds")
            except TypeError:
                s = dt.isoformat()
        return s