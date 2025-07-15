from sqlalchemy.orm import Query
from sqlalchemy.ext.declarative import DeclarativeMeta
from typing import Type, TypeVar, Optional

T = TypeVar('T', bound=DeclarativeMeta)

class QueryFilterBuilder:
    def __init__(self, query: Query, model: Type[T]):
        self.query = query
        self.model = model

    def exact_filter(self, attribute_name: str, value: Optional[str]):
        if not value:
            return self
        attr = getattr(self.model, attribute_name, None)
        if attr is not None:
            self.query = self.query.filter(attr == value)
        return self
    
    def prefix_filter(self,  attribute_name: str, value: Optional[str]):
        if not value:
            return self
        attr = getattr(self.model, attribute_name, None)
        if attr is not None:
            self.query = self.query.filter(attr.startswith(value))
        return self
    
    def suffix_filter(self,  attribute_name: str, value: Optional[str]):
        if not value:
            return self
        attr = getattr(self.model, attribute_name, None)
        if attr is not None:
            self.query = self.query.filter(attr.endswith(value))
        return self
    
    def contains_filter(self,  attribute_name: str, value: Optional[str]):
        if not value:
            return self
        attr = getattr(self.model, attribute_name, None)
        if attr is not None:
            self.query = self.query.filter(attr.contains(value))
        return self
    
    def build(self):
        return self.query